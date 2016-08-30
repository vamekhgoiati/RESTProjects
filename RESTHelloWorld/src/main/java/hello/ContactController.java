package hello;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * vamekh on 8/23/16.
 */

@CrossOrigin(origins = "*")
@RestController
public class ContactController {

    Map<Long, Contact> contacts = new HashMap<>();

    @RequestMapping(value = "/contact", method = RequestMethod.GET)
    public ResponseEntity<List<Contact>> getContactList() {
        return new ResponseEntity<>(contacts.values().stream().collect(Collectors.toList()), HttpStatus.OK);
    }

    @RequestMapping(value = "/contact/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Contact> getContact(@PathVariable("id") long id) {
        Contact result = contacts.get(id);
        return new ResponseEntity<>(result, result == null ? HttpStatus.NOT_FOUND : HttpStatus.OK);
    }

    @RequestMapping(value = "/contact", method = RequestMethod.POST)
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact, UriComponentsBuilder ucBuilder) {
        if (contacts.containsKey(contact.getId())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        contact.setId(contacts.isEmpty() ? 1 : contacts.keySet().stream().reduce((id1, id2) -> id1 > id2 ? id1 : id2).get() + 1);
        contacts.put(contact.getId(), contact);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/contact/{id}").buildAndExpand(contact.getId()).toUri());

        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/contact/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Contact> updateContact(@PathVariable("id") long id, @RequestBody Contact contact) {
        if (!contacts.containsKey(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Contact currContact = contacts.get(id);
        currContact.setName(contact.getName());
        currContact.setSurname(contact.getSurname());
        currContact.setPhone(contact.getPhone());
        currContact.setEmail(contact.getEmail());

        contacts.put(currContact.getId(), currContact);

        return new ResponseEntity<>(currContact, HttpStatus.OK);
    }

    @RequestMapping(value = "/contact/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Contact> deleteContact(@PathVariable("id") long id) {

        if (!contacts.containsKey(id)) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        contacts.remove(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/contact", method = RequestMethod.DELETE)
    public ResponseEntity<Contact> deleteAllContacts() {
        contacts.clear();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
