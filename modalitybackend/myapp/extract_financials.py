from langchain_community.document_loaders import PyPDFLoader

# Convert PDF to text
def convert_pdf_to_text(pdf_file):
    loader = PyPDFLoader("/Users/velissarioschristodoulou/Documents/Github Repos/ModalityFinance/modalitybackend/media/FY23-Q1-Combined-NIKE-Press-Release-Schedules-FINAL_bFLU6ao.pdf") 
    pages = loader.load_and_split()
    text = ""
    for page in pages:
        text += page.page_content
    print(text)
    return text

# Extract income statement and store in database
def extract_income_statement(pdf_file):
    text = convert_pdf_to_text(pdf_file)

    from langchain.chat_models import ChatOpenAI 
    from langchain.prompts import ChatPromptTemplate 

    # Create a prompt template for parsing income statement 
    template_string_income_statement = """ {report} \n
    From the above report, extract the income statement. Return is as JSON ready to be saved in a SQL database. The 
    format should be like '{Revenue: {Year 21: 500, Year 22: 1000}, COGS: {...}'. 
    """
    prompt_template_income_statement = ChatPromptTemplate.from_template(template=template_string_income_statement)

    chat = ChatOpenAI(model_name="gpt-4o", temperature=0.7)
    input_tables = prompt_template_income_statement.format_messages(report=text)
    output_tables = chat(input_tables)
    
    return output_tables.content