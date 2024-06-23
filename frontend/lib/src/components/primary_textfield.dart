import 'package:flutter/material.dart';


class PrimaryTextfield extends StatelessWidget {
  const PrimaryTextfield({super.key, required this.suffixText, required this.isMobile, required this.label});
final String suffixText;
final bool isMobile;
final String label;
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        isMobile?SizedBox():  Align(
        alignment: Alignment.centerLeft,
        child: Padding(
          padding: EdgeInsets.only(left: 16),
          child: Text(label,style: TextStyle(
            fontSize: 15, fontWeight: FontWeight.w600,

          ),),
        ),
      ),
        const SizedBox(height: 10),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: TextFormField(
            decoration: InputDecoration(
              hintText: 'Enter amount',
              contentPadding: const EdgeInsets.symmetric(vertical: 15.0, horizontal: 20.0), // Adjust padding as needed
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(3.0), // Add border if desired
              ),
              suffixIcon:  Container(
                width: 60,
                height: 55,
                decoration: BoxDecoration(
                  border:  Border.all(color: Colors.grey),
                ),
                child:  Center(
                  child: Text(suffixText,style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                  ),),
                ),

              ),
            ),
          ),
        ),
      ],
    );
  }
}
