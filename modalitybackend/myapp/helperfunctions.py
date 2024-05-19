# Helper functions for the API calls 

import openai
import numpy as np
import fitz  # PyMuPDF
from langchain_community.document_loaders import PyPDFLoader
from openai import OpenAI


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



# Extract text from PDF file
def extract_text_from_pdf(file_path):
    loader = PyPDFLoader(file_path)
    pages = loader.load_and_split()
    text = ""
    for page in pages:
        text += page.page_content
    return text

# Generate a vector embedding given a document path stored in our database
def generate_vector_embedding(text):
    client = OpenAI()
    response = client.embeddings.create(
        input=[text],
        model="text-embedding-3-large"
    )
    embedding = response.data[0].embedding
    return np.array(embedding, dtype=float)  # Convert to list for JSON serialization

# Compute cosine similarity of two vectors
def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1, dtype=float)
    vec2 = np.array(vec2, dtype=float)
    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    return dot_product / (norm_vec1 * norm_vec2)


