def validate_required_fields(data):
    """
    Validate that all required fields are present and not empty in the input data.

    :param data: The input data to validate (dict).
    :return: (bool, str) - True and None if validation passes, False and error message if it fails.
    """
    required_fields = ['name', 'email', 'gender', 'description', 'role']
    for field in required_fields:
        if field not in data or not data[field]:
            return False, f"'{field}' is required and cannot be empty"
    return True, None