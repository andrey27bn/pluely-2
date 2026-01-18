/*
 * This file is part of Pluely.
 *
 * Pluely is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pluely is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Pluely.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useState } from "react";
import { Button } from "@/components";
import { invoke } from "@tauri-apps/api/core";
import { openUrl } from "@tauri-apps/plugin-opener";
import { ANALYTICS_EVENTS, captureEvent } from "@/lib";

interface CheckoutResponse {
  success?: boolean;
  checkout_url?: string;
  error?: string;
}
export const GetLicense = ({
  setState,
  buttonText,
  buttonClassName = "",
}: {
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText?: string;
  buttonClassName?: string;
}) => {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleGetLicenseKey = async () => {
    setIsCheckoutLoading(true);

    try {
      const response: CheckoutResponse = await invoke("get_checkout_url");

      if (response.success && response.checkout_url) {
        // Open checkout URL in default browser
        await openUrl(response.checkout_url);
        setState?.(false);
      }
    } catch (err) {
      console.error("Failed to get checkout URL:", err);
    } finally {
      setIsCheckoutLoading(false);
      // Track get license
      await captureEvent(ANALYTICS_EVENTS.GET_LICENSE);
    }
  };

  return (
    <Button
      onClick={handleGetLicenseKey}
      disabled={isCheckoutLoading}
      size="sm"
      className={buttonClassName}
    >
      {isCheckoutLoading ? "Loading..." : buttonText || "Get License"}
    </Button>
  );
};
