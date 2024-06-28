import 'package:dash_money/src/components/feedback_component.dart';
import 'package:dash_money/src/components/offer_card.dart';
import 'package:dash_money/src/components/primary_button.dart';
import 'package:dash_money/src/components/primary_textfield.dart';
import 'package:flutter/material.dart';

class OrderOverviewMobile extends StatelessWidget {
  const OrderOverviewMobile({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Column(
            children: [
              const SizedBox(height: 16 * 2),
              const Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: EdgeInsets.only(left: 16),
                  child: Text(
                    "How Much Do you want to Buy?",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              const Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: EdgeInsets.only(left: 16),
                  child: Text(
                    "I will pay",
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 10),
              const PrimaryTextfield(
                suffixText: 'EUR',
                isMobile: true,
                label: '',
              ),
              const SizedBox(height: 10),
              const Padding(
                padding: EdgeInsets.only(left: 16),
                child: Row(
                  children: [
                    Icon(
                      Icons.info_outline,
                      size: 20,
                      color: Colors.grey,
                    ),
                    SizedBox(width: 10),
                    Text(
                      "Enter amount to get started",
                      style: TextStyle(
                        fontSize: 15,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              const Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: EdgeInsets.only(left: 16),
                  child: Text(
                    "and receive",
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              const PrimaryTextfield(
                suffixText: 'DASH',
                isMobile: true,
                label: '',
              ),
              const SizedBox(height: 16),
              const PrimaryButton(
                isWeb: false,
              ),
              const SizedBox(height: 16),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 16.0),
                child: Text.rich(
                  TextSpan(
                    text: "Reserve bitcoin for this trade and live chat with ",
                    style: TextStyle(
                      fontSize: 15,
                      color: Colors.grey,
                    ),
                    children: [
                      TextSpan(
                        text: "johnDoe",
                        style: TextStyle(
                          fontSize: 15,
                          color: Colors.blue,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              const Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: EdgeInsets.only(left: 16),
                  child: Text(
                    "About this offer",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              OfferCard(),
              const SizedBox(height: 16),
              const Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: EdgeInsets.only(left: 16),
                  child: Text(
                    "About this seller",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 30,
                      backgroundColor: Colors.grey[300],
                      child: const Center(
                        child: Icon(
                          Icons.person,
                          size: 30,
                          color: Colors.grey,
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const Text(
                              'John Doe',
                              style: TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(width: 5),
                            ClipRRect(
                              borderRadius: BorderRadius.circular(5),
                              child: Image.network(
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/255px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png',
                                height: 20,
                                width: 20,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 5),
                        const Text(
                          'Seen 30 minutes ago',
                          style: TextStyle(
                            fontSize: 15,
                            color: Colors.grey,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16 * 3),
              const FeedbackComponent(
                icon: Icons.thumb_up_alt_outlined,
                feedbackCount: 40,
                isPositive: true,
              ),
              const SizedBox(height: 10),
              const FeedbackComponent(
                icon: Icons.thumb_down_alt_outlined,
                feedbackCount: 60,
                isPositive: false,
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
