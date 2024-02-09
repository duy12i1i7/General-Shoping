const { app, BrowserWindow } = require('electron');
const path = require('path');
const mysql = require('mysql2');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Cần thiết cho Electron 12 trở lên
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('renderer/login/index.html');
}
function deleteDataFromDatabase() {
  return new Promise((resolve, reject) => {
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '05122002',
      database: 'datasbase_for_shopping_system'
    });

    connection.connect(err => {
      if (err) {
        console.error('Error connecting to database: ', err);
        reject(err);
        return;
      }

      const query = 'DELETE FROM cart'; // Thay đổi tên bảng ở đây
      connection.query(query, (error) => {
        if (error) {
          console.error('Error deleting data: ', error);
          reject(error);
        } else {
          console.log('Data deleted successfully');
          resolve();
        }
        connection.end();
      });
    });
  });
}
app.whenReady().then(createWindow);

let isQuitting = false; // Biến cờ

app.on('before-quit', (event) => {
  if (!isQuitting) { // Kiểm tra xem hàm xóa dữ liệu đã được gọi hay chưa
    event.preventDefault(); // Ngăn chặn ứng dụng đóng ngay lập tức
    isQuitting = true; // Đặt cờ

    deleteDataFromDatabase().then(() => {
      app.quit(); // Đóng ứng dụng sau khi xóa dữ liệu
    }).catch(err => {
      console.error('Failed to delete data: ', err);
      app.quit(); // Vẫn đóng ứng dụng ngay cả khi có lỗi
    });
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
