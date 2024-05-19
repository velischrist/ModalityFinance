from .helperfunctions import cosine_similarity, generate_vector_embedding
from .models import Document
from django.core.exceptions import ObjectDoesNotExist
import numpy as np
import json

# Find the most similar document based on a user query
def retrieve_most_similar_document(query):
    # Generate the embedding for the user query
    query_embedding = generate_vector_embedding(query)

    max_similarity = -1
    most_similar_document = None

    # Iterate over all documents to find the most similar one
    for document in Document.objects.all():
        if document.embedding is not None:
            print("Name: ", document.documentname)
            
            document_embedding = np.array(document.embedding, dtype=float) 
            similarity = cosine_similarity(query_embedding, document_embedding)
            print("Similarity: ", similarity)

            if similarity > max_similarity:
                max_similarity = similarity
                most_similar_document = document

    return most_similar_document.documentpath, max_similarity