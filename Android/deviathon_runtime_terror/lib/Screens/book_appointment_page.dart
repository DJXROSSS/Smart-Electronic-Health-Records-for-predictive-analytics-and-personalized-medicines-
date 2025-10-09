import 'package:flutter/material.dart';

class BookAppointmentPage extends StatelessWidget {
  const BookAppointmentPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Book Appointment")),
      body: const Center(
        child: Text(
          "Book Appointment Page Placeholder",
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
        ),
      ),
    );
  }
}
