const BASE_URL = 'https://65b7aa2846324d531d552c14.mockapi.io/contacts';

export const fetchContacts = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch contacts');
  }
};

export const addNewContact = async newContact => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    });

    if (!response.ok) {
      throw new Error('Failed to add contact');
    }

    return response.json();
  } catch (error) {
    throw new Error('Failed to add contact');
  }
};

export const deleteContact = async contactId => {
  try {
    const response = await fetch(`${BASE_URL}/${contactId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
    return contactId;
  } catch (error) {
    throw new Error('Failed to delete contact');
  }
};
