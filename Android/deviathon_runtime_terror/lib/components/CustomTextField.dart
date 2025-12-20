import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

// The StatefulWidget class is immutable and holds the final properties.
class CustomTextField extends StatefulWidget {
  final String label;
  final Color labelColor;
  final IconData icon;
  final Color accent;
  final Color iconColor;
  final TextEditingController controller;
  final TextInputType keyboardType;
  final bool isDate;

  const CustomTextField({
    super.key,
    required this.label,
    required this.icon,
    this.iconColor = const Color(0xFF2A4365),
    this.labelColor = Colors.grey,
    this.accent = const Color(0xFFE3F2FD),
    required this.controller,
    this.keyboardType = TextInputType.text,
    this.isDate = false,
  });

  // The createState method creates the mutable state for this widget.
  @override
  State<CustomTextField> createState() => _CustomTextFieldState();
}

// The State class is where the mutable state and the build method reside.
class _CustomTextFieldState extends State<CustomTextField> {

  // This function handles showing the date picker and updating the controller.
  Future<void> _selectDate(BuildContext context) async {
    // Hide the keyboard if it's open.
    FocusScope.of(context).requestFocus(FocusNode());

    DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: DateTime(2000), // A sensible default initial date
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    );

    if (pickedDate != null) {
      String formattedDate = DateFormat('dd/MM/yyyy').format(pickedDate);
      // We call setState to rebuild the widget with the new controller text.
      setState(() {
        widget.controller.text = formattedDate;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: TextFormField(
        // Properties are accessed from the widget using the 'widget.' prefix.
        controller: widget.controller,
        keyboardType: widget.keyboardType,
        readOnly: widget.isDate, // Makes the text field not editable directly for dates
        textCapitalization: TextCapitalization.words,
        decoration: InputDecoration(
          labelText: widget.label,
          prefixIcon: Icon(widget.icon, color: widget.iconColor),
          filled: true,
          fillColor: Colors.white,
          labelStyle: TextStyle(color: widget.labelColor),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: widget.accent),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: widget.accent),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide(color: widget.labelColor, width: 2),
          ),
        ),
        // The onTap callback triggers the date picker if isDate is true.
        onTap: widget.isDate ? () => _selectDate(context) : null,
      ),
    );
  }
}
