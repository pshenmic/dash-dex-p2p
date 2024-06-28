import 'package:flutter/material.dart';


class OfferCard extends StatelessWidget {
  const OfferCard({super.key});

  @override
  Widget build(BuildContext context) {
    return  Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Container(
        width: MediaQuery.of(context).size.width,
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 20),
        decoration: const BoxDecoration(
          borderRadius:  BorderRadius.all(Radius.circular(5)),

          border: Border.fromBorderSide(BorderSide(color: Colors.grey)),
        ),
        child: Column(children: [
          const Row(children: [
            Text('Seller Rate',style: TextStyle(
              fontSize: 15,
              color: Colors.grey,
              fontWeight:  FontWeight.w600,
            ),),
            SizedBox(width: 5),
            Icon(Icons.star_outline,size: 20,color: Colors.grey,),
          ],
          ),
          const SizedBox(height: 10),
          Row(children: [
            const Text('655525445 EUR',style: TextStyle(
              fontSize: 15,

              fontWeight:  FontWeight.w600,
            ),),
            const SizedBox(width: 5),
            Container(
              height: 5,
              width: 5,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.grey,
              ),
            ),
            const SizedBox(width: 5),
            const Text('655525445 EUR',style: TextStyle(
              fontSize: 15,
              color: Colors.grey,
              fontWeight:  FontWeight.w600,
            ),),
          ],
          ),
          const SizedBox(height: 20),
          const Row(children: [
            Text('Buy limits',style: TextStyle(
              fontSize: 15,
              color: Colors.grey,
              fontWeight:  FontWeight.w600,
            ),),
            SizedBox(width: 5),
            Icon(Icons.info_outline,size: 20,color: Colors.grey,),
          ],
          ),
          const SizedBox(height: 10),
          const Row(children: [
            Text.rich(
              TextSpan(
                text: ' ',
                
                children: [
                  TextSpan(
                    text: 'Min',
                    style: TextStyle(
                      fontSize: 15,
                      color: Colors.grey,
                      fontWeight:  FontWeight.w600,
                    ),
                  ),
                  TextSpan(
                    text: ' 30 EUR',
                    style: TextStyle(
                      fontSize: 15,

                      fontWeight:  FontWeight.w600,
                    ),
                  ),
                  TextSpan(
                    text: '  -',
                    style: TextStyle(
                      fontSize: 15,
                      color: Colors.grey,
                      fontWeight:  FontWeight.w600,
                    ),
                  ),
                  TextSpan(
                    text: '  Max',
                    style: TextStyle(
                      fontSize: 15,
                      color: Colors.grey,
                      fontWeight:  FontWeight.w600,
                    ),
                  ),
                  TextSpan(
                    text: '  1000 EUR',
                    style: TextStyle(
                      fontSize: 15,

                      fontWeight:  FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ],
          ),
          const SizedBox(height: 20),
          const Row(children: [
            Text('Trade time limit',style: TextStyle(
              fontSize: 15,
              color: Colors.grey,
              fontWeight:  FontWeight.w600,
            ),),
            SizedBox(width: 5),
            Icon(Icons.info_outline,size: 20,color: Colors.grey,),
          ],
          ),
          const SizedBox(height: 10),
          const Align(
            alignment: Alignment.centerLeft,
            child: Text('30 Min',style: TextStyle(
              fontSize: 15,

              fontWeight:  FontWeight.w600,
            ),),
          ),
          const SizedBox(height: 20),
          const Row(children: [
            Text('Paxful fee',style: TextStyle(
              fontSize: 15,
              color: Colors.grey,
              fontWeight:  FontWeight.w600,
            ),),

          ],
          ),
          const SizedBox(height: 10),
          const Align(
            alignment: Alignment.centerLeft,
            child: Text('0%',style: TextStyle(
              fontSize: 15,

              fontWeight:  FontWeight.w600,
            ),
            ),
          ),
        ],
        ),
      ),
    );
  }
}
