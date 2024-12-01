<?php
header('Content-Type: text/html; charset=utf-8');

// Список заблокированных IP-адресов
$blocked_ips = ['192.168.1.1', '123.45.67.89'];
if (in_array($_SERVER['REMOTE_ADDR'], $blocked_ips)) {
    die('Ваш IP-адрес заблокирован.');
}

// Проверка заголовка User-Agent
$user_agent = $_SERVER['HTTP_USER_AGENT'];
if (empty($user_agent) || strpos($user_agent, 'bot') !== false) {
    die('Запрещено отправлять запросы с использованием бота.');
}

// Информация по токену и chat id
$tg_bot_token = "";
$chat_id = "";

$text = "✨ Нове замовлення ✨\n\n";

// Собираем данные из POST
foreach ($_POST as $key => $val) {
    $text .= $key . ": " . $val . "\n";
}

$text .= "\n\n🌐IP SERVER: " . $_SERVER['REMOTE_ADDR'];

$param = ["chat_id" => $chat_id, "text" => $text];
$url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendMessage?" . http_build_query($param);

// Отправляем сообщение в Telegram
var_dump($text);
file_get_contents($url);

// Обрабатываем загруженные файлы
foreach ($_FILES as $file) {
    $url = "https://api.telegram.org/bot" . $tg_bot_token . "/sendDocument";
    move_uploaded_file($file['tmp_name'], $file['name']);
    $document = new \CURLFile($file['name']);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, ["chat_id" => $chat_id, "document" => $document]);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $out = curl_exec($ch);
    curl_close($ch);
    unlink($file['name']);
}

die('1');
?>