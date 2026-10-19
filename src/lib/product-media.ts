/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Media, MEDIA } from "@/lib/media";
import { ProductKey } from "@/lib/navigation";

export const PRODUCT_VISUALS: Record<ProductKey, Media> = {
  dashboardManager: MEDIA.product.deckDashboard,
  parkwizeAi: MEDIA.product.deckAi,
  digitalSignage: MEDIA.product.signageScreensPortrait,
  onlineReservation: MEDIA.product.deckBooking,
  enforcement: MEDIA.os.enforcementOfficer,
  processKiosk: MEDIA.product.processHardware,
  parkAid: MEDIA.brand.parkaidLogo,
};
