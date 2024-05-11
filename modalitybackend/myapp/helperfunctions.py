# Helper functions for the API calls 

# This function takes an array and slices it to return only the elements 
# that belong to the specified page, based on the page_size and page_number
def paginate(array, page_size, page_number):
    return array[(page_number - 1) * page_size : page_number * page_size]

# Function Definition: The function wild_card_search takes three parameters
# —lst (a list of dictionaries), 
# input_str (the string to search for), and
# specify_key (an optional parameter that specifies which key's values should 
#       be searched within each dictionary).
def wild_card_search(lst, input_str, specify_key='companyname'):
    def search_text(item):
        for key in item:
            if specify_key:
                key = specify_key
            if item.get(key) is None:
                continue
            if str(item[key]).upper().find(str(input_str).upper()) != -1:
                return True
        return False

    result = [value for value in lst if search_text(value)]
    return result