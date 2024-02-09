import mysql.connector
import json
import os
import decimal
import sys


keyword = sys.argv[1].lower() if len(sys.argv) > 1 else ''


# Thiết lập kết nối với CSDL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="05122002",
    database="datasbase_for_shopping_system"
)


cursor = conn.cursor()

# Truy vấn lấy dữ liệu
query = "SELECT ID, Name_of_Product, Quantity, Cost, Commission, Description, Shop_Owner, ShopID, image, Rating FROM product"
cursor.execute(query)

rows = cursor.fetchall()

# Chuyển đổi dữ liệu
data = []
for row in rows:
    data.append({
        'id': row[0],
        'name': row[1],
        'category': row[5],
        'rating': float(row[9]),
        'price': float(row[3]) if isinstance(row[3], decimal.Decimal) else row[3],
        'img': row[8],  # Chú ý tại đây
        'quantity': 1,
        'subsist': row[2],
        'shop_owner': row[6],
        'shop_id': row[7]
    })

# Đường dẫn đến file
file_path = 'fooditem.js'
filtered_data = [item for item in data if keyword in item['name'].lower()]


def default(obj):
    if isinstance(obj, decimal.Decimal):
        return str(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)


# Kiểm tra và tạo file nếu chưa tồn tại
if not os.path.exists(file_path):
    with open(file_path, 'w') as file:
        file.write('')  # Tạo file trống

# Xuất dữ liệu ra file JavaScript
with open(file_path, 'w') as file:
    js_data = json.dumps(filtered_data, indent=4, default=default)
    js_data = js_data.replace('"', "'").replace("'id'", "id").replace("'name'", "name").replace("'category'", "category").replace("'rating'", "rating").replace("'price'", "price").replace("'img'", "img").replace("'quantity'", "quantity").replace("'subsist'", "subsist").replace("'shop_owner'", "shop_owner").replace("'shop_id'", "shop_id")
    file.write('const foodItem = ')
    file.write(js_data)
    file.write('\n\nexport { foodItem };')

# Đóng kết nối
cursor.close()
conn.close()
