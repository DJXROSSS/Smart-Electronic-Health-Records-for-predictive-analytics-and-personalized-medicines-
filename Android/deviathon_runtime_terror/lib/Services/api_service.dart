import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "https://predictiveanalysiss.streamlit.app/";
  // replace with your backend URL if deployed

  static Future<Map<String, dynamic>> predictDisease(String symptoms) async {
    final url = Uri.parse("$baseUrl/predict");
    final response = await http.post(
      url,
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"symptoms": symptoms}),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception("Failed to predict disease");
    }
  }
}
