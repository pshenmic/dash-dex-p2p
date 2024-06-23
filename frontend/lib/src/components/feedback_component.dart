import 'package:flutter/material.dart';


class FeedbackComponent extends StatelessWidget {
  const FeedbackComponent({super.key, required this.isPositive, required this.feedbackCount, required this.icon});
final bool isPositive;
final int feedbackCount;
final IconData icon;
  @override
  Widget build(BuildContext context) {
    return  Padding(
      padding: const EdgeInsets.only(left: 16),
      child: Row(

        children: [
          Icon(icon,color: isPositive ? Colors.green : Colors.red, size: 20,),
          const SizedBox(width: 5),
          Text.rich(
            TextSpan(
              text: ' ',
               
              children: [
                TextSpan(
                  text:  feedbackCount.toString(),
                  style: TextStyle(
                    fontSize: 15,

                    fontWeight:  FontWeight.w600,
                  ),
                ),
                TextSpan(
                  text: ' ' + (isPositive ? 'Positive feedback' : 'Negative feedback'),
                  style: TextStyle(
                    fontSize: 15,
                    color: Colors.grey,
                    fontWeight:  FontWeight.w600,
                  ),
                ),

              ],
            ),

          )
        ],
      ),
    );
  }
}
