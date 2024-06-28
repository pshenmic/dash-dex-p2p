import 'package:flutter/material.dart';


class PrimaryButton extends StatelessWidget {
  const PrimaryButton({super.key, required this.isWeb});
final bool isWeb;
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 55,
      width: MediaQuery.of(context).size.width,
      margin: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.grey[300],
        borderRadius: BorderRadius.circular(5),
      ),
      child:   Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Row(
          mainAxisAlignment: isWeb ? MainAxisAlignment.center : MainAxisAlignment.spaceBetween,
          children: [
            const Text("Buy Now",style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w600,
              color: Colors.grey,
            ),),
            isWeb?const SizedBox():    const Icon(Icons.arrow_forward_ios,size: 20,  color: Colors.grey,),
          ],
        ),
      ),
    );
  }
}
