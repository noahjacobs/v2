"use client";

import { useState, useEffect } from "react";

import dayjs from "@calcom/dayjs";
import { TimezoneSelect } from "@calcom/features/components/timezone-select/TimezoneSelect";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { localeOptions } from "@calcom/lib/i18n";
import { trpc } from "@calcom/trpc/react";
import { Button } from "@calcom/ui/components/button";
import { Label } from "@calcom/ui/components/form";
import { Select } from "@calcom/ui/components/form";
import { showToast } from "@calcom/ui/components/toast";

type TimezoneSelectionProps = {
  onSuccess: () => void;
  onPrevStep: () => void;
} & Omit<JSX.IntrinsicElements["form"], "onSubmit">;

const TimezoneSelection = ({ onSuccess, onPrevStep, ...rest }: TimezoneSelectionProps) => {
  const { t } = useLocale();
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [selectedLocale, setSelectedLocale] = useState<{ value: string; label: string }>({
    value: "en",
    label: localeOptions.find((opt) => opt.value === "en")?.label || "English",
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Try to detect user's browser language
    const browserLang = navigator.language.split("-")[0];
    const matchedLocale = localeOptions.find((opt) => opt.value === browserLang);
    if (matchedLocale) {
      setSelectedLocale(matchedLocale);
    }
  }, []);

  const mutation = trpc.viewer.me.updateProfile.useMutation({
    onSuccess: (res) => {
      showToast(t("settings_updated_successfully"), "success");
      if (res.locale) {
        window.calNewLocale = res.locale;
        document.cookie = `calNewLocale=${res.locale}; path=/`;
      }
      onSuccess();
    },
    onError: () => {
      showToast(t("error_updating_settings"), "error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      timeZone: selectedTimezone,
      locale: selectedLocale.value,
    });
  };

  return (
    <form {...rest} onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="w-full">
          <Label className="text-default block text-sm font-medium">{t("language")}</Label>
          <Select<{ label: string; value: string }>
            className="mt-2 capitalize"
            options={localeOptions}
            value={selectedLocale}
            onChange={(option) => {
              if (option) {
                setSelectedLocale(option);
              }
            }}
            menuPortalTarget={isMounted ? document.body : undefined}
            menuPosition="fixed"
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </div>

        <div className="w-full">
          <Label className="text-default block text-sm font-medium">{t("timezone")}</Label>
          <TimezoneSelect
            id="timeZone"
            value={selectedTimezone}
            onChange={(tz) => {
              if (tz?.value) {
                setSelectedTimezone(tz.value);
              }
            }}
            className="mt-2 w-full rounded-md text-sm"
            menuPortalTarget={isMounted ? document.body : undefined}
            menuPosition="fixed"
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
          <p className="text-subtle mt-3 flex flex-row font-sans text-xs leading-tight">
            {t("current_time")} {dayjs().tz(selectedTimezone).format("LT").toString().toLowerCase()}
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-2">
        <Button type="button" color="secondary" onClick={onPrevStep}>
          {t("prev_step")}
        </Button>
        <Button type="submit" color="primary" loading={mutation.isPending}>
          {t("next_step_text")}
        </Button>
      </div>
    </form>
  );
};

export default TimezoneSelection;
