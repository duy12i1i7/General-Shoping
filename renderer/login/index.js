// login.js
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const NotiMessage = document.getElementById('NotiMessage');
const signUpForm = document.getElementById('signUpForm');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  authenticate(username, password)
    .then(response => {
      if (response.isValid) {
        console.log("ID Người dùng:", response.userId);
        sessionStorage.setItem('userId', response.userId);
        window.location.href = './../client/index.html'; // Chuyển hướng
      } else {
        errorMessage.style.display = 'block'; // Hiển thị lỗi
      }
    })
    .catch(error => {
      console.error('Lỗi đăng nhập:', error);
      errorMessage.style.display = 'block'; // Hiển thị lỗi
    });
});


function authenticate(username, password) {
  return new Promise((resolve, reject) => {
    var mysql = require('mysql2');

    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '05122002',
      database: 'datasbase_for_shopping_system'
    });

    connection.connect(function(err) {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log('Đã kết nối thành công!');
    });

    const query = 'SELECT * FROM user WHERE user = ? AND pass = ?';

    connection.query(query, [username, password], (err, results) => {
      connection.end();

      if (err) {
        console.error(err);
        reject(err);
      } else if (results.length > 0) {
        const userId = results[0].ID; // Giả sử cột chứa ID là 'id'
        resolve({ isValid: true, userId: userId });
      } else {
        console.log('Thông tin không chính xác.');
        resolve({ isValid: false });
      }
    });
  });
}

signUpForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('acc').value;
  const password = document.getElementById('pass').value;

  authenticate(username, password)
    .then(response => {
      if (response.isValid) {
        document.getElementById('NotiMessage').textContent = 'User exists!';
        NotiMessage.style.display = 'block'; 
      } else {
        document.getElementById('NotiMessage').textContent = 'Sign up successfully!';
        NotiMessage.style.display = 'block'; 
        var mysql = require('mysql2');

        var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '05122002',
        database: 'datasbase_for_shopping_system'
        });

        connection.connect(function(err) {
        if (err) {
            console.error(err);
            reject(err);
        }
        console.log('Đã kết nối thành công!');
        });
        var newAcc = { ID: null, user: username, pass: password, Type_of_User: 'user', Shop_Owner: null };
        var query = 'INSERT INTO user SET ?';
        connection.query(query, newAcc, (err, results) => {
        connection.end();
        if (err) {
            console.error(err);
            reject(err);
        } else {
            console.log('Thêm tài khoản thành công!');
        }
        }
        );
      }
    })
    .catch(error => {
      console.error('Lỗi đăng nhập:', error);
      document.getElementById('NotiMessage').textContent = 'Unknown error!';
      NotiMessage.style.display = 'block'; 
    });
});


const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
