from openpyxl import Workbook, load_workbook
from datetime import datetime
import os

EXCEL_FILE = os.path.join(os.path.dirname(__file__), '..', 'data', 'user_submissions.xlsx')

def save_user_data(data):
    """Save user form submission to Excel file."""
    
    # Create data directory if it doesn't exist
    os.makedirs(os.path.dirname(EXCEL_FILE), exist_ok=True)
    
    # Check if file exists
    if os.path.exists(EXCEL_FILE):
        # Load existing workbook
        wb = load_workbook(EXCEL_FILE)
        ws = wb.active
    else:
        # Create new workbook with headers
        wb = Workbook()
        ws = wb.active
        ws.title = "User Submissions"
        
        # Add headers
        headers = [
            'Timestamp',
            'Name',
            'Email',
            'Topic',
            'Background',
            'Experience Level',
            'Specific Interest',
            'Learning Goal'
        ]
        ws.append(headers)
    
    # Add new row with user data
    row_data = [
        datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        data.get('name', ''),
        data.get('email', ''),
        data.get('topic', ''),
        data.get('background', ''),
        data.get('experience', ''),
        data.get('interest', ''),
        data.get('goal', '')
    ]
    
    ws.append(row_data)
    
    # Save the workbook
    wb.save(EXCEL_FILE)
    print(f"✅ User data saved to Excel: {data.get('email')}")
