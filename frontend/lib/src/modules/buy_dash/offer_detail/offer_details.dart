import 'package:dash_money/src/modules/buy_dash/offer_detail/offer_detail_web.dart';
import 'package:flutter/material.dart';
import 'package:responsive_builder/responsive_builder.dart';
import 'offer_detail_mobile.dart';


class OrderOverview extends StatelessWidget {
  const OrderOverview({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ResponsiveBuilder(
        builder: (context, sizingInformation) {
          if (sizingInformation.deviceScreenType == DeviceScreenType.desktop) {
            return const OrderOverviewWeb();
          }

          if (sizingInformation.deviceScreenType == DeviceScreenType.tablet) {
            return const OrderOverviewMobile();
          }

          return const OrderOverviewMobile();
        },
      ),
    );
  }
}
