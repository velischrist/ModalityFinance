import pdfplumber
import pandas as pd
import json

# The following function displays JSON data in a readable, nicely formatted manner
def display_json(data):
    # Check if data is a string that needs to be loaded as JSON
    if isinstance(data, str):
        try:
            data = json.loads(data)  # Convert string to JSON object
        except json.JSONDecodeError:
            print("Invalid JSON string provided.")
            return

    # Print the JSON data formatted
    print(json.dumps(data, indent=4, sort_keys=False))


# The following function opens a PDF file, extracts tables from each page, 
# and converts them into JSON format.
def extract_tables_to_json(pdf_path):
    # Open the PDF file
    with pdfplumber.open(pdf_path) as pdf:
        all_tables = []  # This will store all tables from each page as a list of dictionaries
        
        # Iterate through each page of the PDF
        for page in pdf.pages:
            # Extract tables from the page
            tables = page.extract_tables()
            
            # For each table found
            for table in tables:
                # Load table into a DataFrame
                df = pd.DataFrame(table[1:], columns=table[0])
                # Convert DataFrame to dictionary and append to list
                all_tables.append(df.to_dict('records'))
    
    # Convert the list of tables to JSON format
    json_data = pd.json_normalize(all_tables, sep='_').to_json(orient='records')
    return json_data

# Example usage
pdf_path = '/Users/velissarioschristodoulou/Documents/Github Repos/ModalityFinance/modalitybackend/media/FY23-Q1-Combined-NIKE-Press-Release-Schedules-FINAL.pdf'
json_output = extract_tables_to_json(pdf_path)
display_json(json_output)
