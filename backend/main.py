import os
import asyncio
from typing import List, Optional
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai

# Configure Google Gemini API
api_key = os.environ.get("GEMINI_API_KEY", "dummy_key")
genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-2.5-flash')

app = FastAPI(title="IMPERIALS API")

# Enable CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class Product(BaseModel):
    id: str
    name: str
    price: float
    image_url: str
    description: str

class CartItem(BaseModel):
    product_id: str
    quantity: int

class PaymentRequest(BaseModel):
    cart_items: List[CartItem]
    total_amount: float
    user_email: str

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

class ChatMessage(BaseModel):
    role: str # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

# --- Dummy Data ---
DUMMY_PRODUCTS = [
    Product(
        id="p1", 
        name="Obsidian Silk Trench", 
        price=1250.00, 
        image_url="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop", 
        description="A lightweight, water-resistant trench coat tailored from pure Italian silk."
    ),
    Product(
        id="p2", 
        name="Champagne Gold Evening Gown", 
        price=3400.00, 
        image_url="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop", 
        description="Hand-stitched evening gown with subtle gold threading and a sweeping silhouette."
    ),
    Product(
        id="p3", 
        name="Cashmere Turtleneck", 
        price=850.00, 
        image_url="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop", 
        description="Ultra-soft Mongolian cashmere turtleneck in pure white."
    ),
    Product(
        id="p4", 
        name="Leather Weekend Voyager", 
        price=1800.00, 
        image_url="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop", 
        description="Spacious travel bag crafted from full-grain obsidian leather."
    )
]

# --- Endpoints ---

@app.get("/products", response_model=List[Product])
async def get_products():
    return DUMMY_PRODUCTS

@app.post("/process-payment")
async def process_payment(request: PaymentRequest):
    await asyncio.sleep(2)
    return {"status": "success", "message": "Payment Successful", "transaction_id": "tx_simulated_987654"}

@app.post("/contact-submit")
async def submit_contact(form: ContactForm):
    return {"status": "success", "message": f"Thank you, {form.name}. Your inquiry has been received."}

@app.post("/chat")
async def chat_concierge(request: ChatRequest):
    system_prompt = (
        "You are the AI Concierge for 'IMPERIALS', an ultra-luxury fashion brand. "
        "Your tone is extremely sophisticated, polite, and knowledgeable. "
        "Always use a formal yet inviting tone. "
        "If asked about materials, emphasize 'Italian silk and hand-sourced cashmere'. "
        "If asked about shipping, say 'We offer complimentary white-glove global delivery'. "
        "Keep your responses concise, elegant, and directly helpful to a high-end clientele."
    )
    
    if api_key == "dummy_key":
        last_message = request.messages[-1].content.lower()
        if "material" in last_message or "fabric" in last_message:
            response = "At IMPERIALS, our garments are crafted exclusively from the finest Italian silk and hand-sourced cashmere, ensuring an unparalleled tactile experience."
        elif "shipping" in last_message or "delivery" in last_message:
            response = "We provide complimentary white-glove global delivery for all our discerning clients."
        else:
            response = f"Thank you for mentioning '{last_message}'. While my full AI capabilities are currently initializing, I can still assist you with our bespoke collections, shipping policies, and materials."
        return {"response": response}

    try:
        history = []
        for msg in request.messages[:-1]:
            role = "user" if msg.role == "user" else "model"
            history.append({"role": role, "parts": [msg.content]})
        
        chat = model.start_chat(history=history)
        prompt = f"System Instruction: {system_prompt}\n\nUser: {request.messages[-1].content}"
        response = chat.send_message(prompt)
        return {"response": response.text}
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return {"response": "I apologize, but my sophisticated systems are currently undergoing maintenance. Please try again shortly."}
