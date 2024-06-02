from langchain_community.document_loaders import PyPDFLoader
import re
import json

# Convert PDF to text
def convert_pdf_to_text(pdf_file):
    loader = PyPDFLoader("/Users/velissarioschristodoulou/Documents/Github Repos/ModalityFinance/modalitybackend/media/FY23-Q1-Combined-NIKE-Press-Release-Schedules-FINAL_bFLU6ao.pdf") 
    pages = loader.load_and_split()
    text = ""
    for page in pages:
        text += page.page_content
    return text

# Extract income statement and store in database
def extract_financial_statements(pdf_file):
    text = convert_pdf_to_text(pdf_file)

    from langchain.chat_models import ChatOpenAI 
    from langchain.prompts import ChatPromptTemplate 

    # Create a prompt template for parsing income statement 
    template_string_financial_statements = """ {report} 
    From the above report, extract the key financial statements (if they exist): income statement, balance sheet, cash flow statament, 
    and shareholder returns. Return the output as multiple JSONs for each of the statement. Each JSON should contain the following fields:
    
    * Company Name                       // Name of the company
    * Report Date                        // Date of the financial report
    * Period End Date                    // End date of the reporting period
    * Statement Type                     // Type of financial statement (e.g., Income Statement, Balance Sheet, Cash Flow, Shareholder Returns)
    * Statement Reporting Period         // Period length of the report (e.g., Annual, Quarterly)
    * Number reporting                   // Whether numbers are reports in thousands, millions, billions, etc. 
    * Data                               // Nested object containing the financial data for every column in the tables (exactly as reported)
    
    Numbers should be returned in thousands. The fields with numbers should only contain the number in thousands, and the field "Number reporting" should be set to "Thousands". 

    An example output JSON of a statement is below. Make your output be in exactly the same format. 

    ```json
    {
    "Company Name": "NIKE, Inc.",
    "Report Date": "September 29, 2022",
    "Period End Date": "August 31, 2022",
    "Statement Type": "Income Statement",
    "Statement Reporting Period": "Quarterly",
    "Number reporting": "Thousands",
    "Data": {
        "Revenues": {
        "8/31/2022": 12687000,
        "8/31/2021": 12248000,
        "Change": 4
        },
        "Cost of sales": {
        "8/31/2022": 7072000,
        "8/31/2021": 6552000,
        "Change": 8
        },
        "Gross profit": {
        "8/31/2022": 5615000,
        "8/31/2021": 5696000,
        "Change": -1
        },
        "Gross margin": {
        "8/31/2022": 44.3,
        "8/31/2021": 46.5
        },
        "Demand creation expense": {
        "8/31/2022": 943000,
        "8/31/2021": 918000,
        "Change": 3
        },
        "Operating overhead expense": {
        "8/31/2022": 2977000,
        "8/31/2021": 2654000,
        "Change": 12
        },
        "Total selling and administrative expense": {
        "8/31/2022": 3920000,
        "8/31/2021": 3572000,
        "Change": 10
        },
        "Percentage of revenues": {
        "8/31/2022": 30.9,
        "8/31/2021": 29.2
        },
        "Interest expense (income), net": {
        "8/31/2022": 13000,
        "8/31/2021": 57000
        },
        "Other (income) expense, net": {
        "8/31/2022": -146000,
        "8/31/2021": -39000
        },
        "Income before income taxes": {
        "8/31/2022": 1828000,
        "8/31/2021": 2106000,
        "Change": -13
        },
        "Income tax expense": {
        "8/31/2022": 360000,
        "8/31/2021": 232000,
        "Change": 55
        },
        "Effective tax rate": {
        "8/31/2022": 19.7,
        "8/31/2021": 11.0
        },
        "NET INCOME": {
        "8/31/2022": 1468000,
        "8/31/2021": 1874000,
        "Change": -22
        },
        "Earnings per common share": {
        "Basic": {
            "8/31/2022": 0.94,
            "8/31/2021": 1.18,
            "Change": -20
        },
        "Diluted": {
            "8/31/2022": 0.93,
            "8/31/2021": 1.16,
            "Change": -20
        }
        },
        "Weighted average common shares outstanding": {
        "Basic": {
            "8/31/2022": 1567100,
            "8/31/2021": 1581900
        },
        "Diluted": {
            "8/31/2022": 1585800,
            "8/31/2021": 1619600
        }
        },
        "Dividends declared per common share": {
        "8/31/2022": 0.305,
        "8/31/2021": 0.275
        }
    }
    }
    ```

    """
    prompt_template_financial_statements = ChatPromptTemplate.from_template(template=template_string_financial_statements)

    chat = ChatOpenAI(model_name="gpt-4o", temperature=0.7)
    input_tables = prompt_template_financial_statements.format_messages(report=text)
    output_tables = chat(input_tables)
    
    json_objects = []
    json_strings = re.findall(r'```json.*?```', output_tables.content, re.DOTALL)
    for str in json_strings:
        # print("String: ", str.strip('```json').strip('```'))
        json_objects.append(json.loads(str.strip('```json').strip('```')))
    
    return json_objects