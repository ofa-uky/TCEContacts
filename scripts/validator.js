function validateContact(newContact) {
    // Check primary contact uniqueness
    if (newContact['Primary Contact'] === 'Yes') {
        const existingPrimary = contacts.find(c => 
            c.College === newContact.College && 
            c['Primary Contact'] === 'Yes'
        );
        if (existingPrimary) {
            throw new Error(`College ${newContact.College} already has primary contact: ${existingPrimary.linkblue}`);
        }
    }

    // Validate department/college relationship
    if (newContact['Contact Type'] === 'College' && newContact.Department !== 'All') {
        throw new Error('College contacts must have Department set to "All"');
    }

    // Validate prefix/course exclusivity
    if (newContact.Prefix && newContact.Course) {
        throw new Error('Cannot specify both Prefix and Course');
    }

    return true;
}
