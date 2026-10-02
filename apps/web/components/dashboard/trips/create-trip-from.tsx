"use client";

import { FormField } from "@/components/form/form-field";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormToggle } from "@/components/form/form-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CURRENCIES } from "@/consts.ts/currency";
import {
  Interest,
  Transportation,
  TravelStyle,
  TripLanguage,
} from "@/enums/trip-enums";
import { generateTripApi } from "@/lib/api/actions";
import { api } from "@/lib/api/client";
import { formatLabel } from "@/lib/text-format";
import { createTripSchema, CreateTripValues } from "@/schemas/trip";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Brain,
  Calendar,
  Clock,
  Coins,
  Footprints,
  Languages,
  MapPin,
  NotebookPen,
  UserRound,
  Wallet,
} from "lucide-react";
import { useRef } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

export const CreateTripFrom = () => {
  const form = useForm<CreateTripValues>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      travelers: 1,
      travelStyle: TravelStyle.RELAXED,
      interests: [],
    },
  });

  const { register, handleSubmit, formState, reset, control, getValues } = form;
  console.log(formState.errors);
  console.log(getValues());

  const onSubmit: SubmitHandler<CreateTripValues> = async (data, event) => {
    const action = event?.nativeEvent
      ? (event.nativeEvent as SubmitEvent).submitter
      : null;

    console.log("submit");
    const actionValue = (action as HTMLButtonElement)?.value;

    if (actionValue === "draft") {
      await generateTripApi(data); // TODO: DARFT
    }

    if (actionValue === "ai") {
      await generateTripApi(data);
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border bg-white p-7">
      <Button
        onClick={() => {
          api("/trip/cover-image/London").then((res) => console.log(res));
        }}
      >
        TEST
      </Button>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            {/* Trip essentials */}
            <div className="grid grid-cols-[230fr_808fr] gap-8.5">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">Trip essentials</p>
                <p className="text-secondary text-sm">
                  Set the destination, dates, and spend.
                </p>
              </div>
              <div className="items-top grid grid-cols-2 gap-3.5">
                <FormInput
                  id="input-field-destination"
                  label="Destination"
                  icon={<MapPin size={18} />}
                  type="text"
                  {...register("destination")}
                />
                <FormInput
                  id="input-field-travelers"
                  label="Number of travelers"
                  icon={<UserRound size={18} />}
                  type="number"
                  min={1}
                  step={1}
                  onWheel={(e) => e.currentTarget.blur()}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", ".", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  {...register("travelers", {
                    valueAsNumber: true,
                  })}
                />
                <FormInput
                  id="input-field-start-date"
                  label="Start date"
                  icon={<Calendar size={18} />}
                  type="date"
                  onClick={(e) => e.currentTarget.showPicker?.()}
                  {...register("startDate", { valueAsDate: true })}
                />
                <FormInput
                  id="input-field-end-date"
                  label="End date"
                  icon={<Calendar size={18} />}
                  type="date"
                  onClick={(e) => e.currentTarget.showPicker?.()}
                  {...register("endDate", { valueAsDate: true })}
                />
                <FormInput
                  id="input-field-budget"
                  label="Budget"
                  description="Total activity and local transport budget"
                  icon={<Wallet size={18} />}
                  type="number"
                  {...register("budget", {
                    valueAsNumber: true,
                  })}
                />
                <FormSelect
                  id="input-field-currency"
                  label="Currency"
                  name="currency"
                  icon={<Coins size={18} />}
                  options={CURRENCIES}
                />
              </div>
            </div>
            <Separator />
            {/* Your travel style */}
            <div className="grid grid-cols-[230fr_808fr] gap-8.5">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">Your travel style</p>
                <p className="text-secondary text-sm">
                  Shape the pace and personality of the itinerary.
                </p>
              </div>
              <div className="items-top grid grid-cols-2 gap-3.5">
                <div className="col-span-full">
                  <Controller
                    name="travelStyle"
                    control={control}
                    render={({ field }) => (
                      <FormToggle
                        id="input-field-travel-style"
                        type="single"
                        label="Travel style"
                        options={Object.values(TravelStyle).map((v) => ({
                          value: v,
                          label: formatLabel(v),
                        }))}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <div className="col-span-full">
                  <Controller
                    name="interests"
                    control={control}
                    render={({ field }) => (
                      <FormToggle
                        id="input-field-interest"
                        type="multiple"
                        label="Travel style"
                        options={Object.values(Interest).map((v) => ({
                          value: v,
                          label: formatLabel(v),
                        }))}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    )}
                  />
                </div>
                <FormSelect
                  id="input-field-transportation"
                  label="Transportation preference"
                  icon={<Footprints size={18} />}
                  options={Object.values(Transportation).map((v) => ({
                    value: v,
                    label: formatLabel(v),
                  }))}
                  {...register("transportation")}
                />
                <FormSelect
                  id="input-field-language"
                  label="Itinerary language"
                  icon={<Languages size={18} />}
                  options={Object.entries(TripLanguage).map(([key, value]) => ({
                    value,
                    label: formatLabel(key),
                  }))}
                  {...register("language")}
                />
              </div>
            </div>
            <Separator />
            {/* Arrival & departure */}
            <div className="grid grid-cols-[230fr_808fr] gap-8.5">
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">Arrival & departure</p>
                <p className="text-secondary text-sm">
                  Help us plan the first and last day realistically.
                </p>
              </div>
              <div className="items-top grid grid-cols-2 gap-3.5">
                <FormInput
                  id="input-field-arrival-location"
                  label="Arrival location"
                  icon={<MapPin size={18} />}
                  type="text"
                  {...register("arrivalLocation")}
                />
                <FormInput
                  id="input-field-arrival-time"
                  label="Arrival time"
                  icon={<Clock size={18} />}
                  type="time"
                  className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                  onClick={(e) => e.currentTarget.showPicker?.()}
                  {...register("arrivalTime")}
                />
                <FormInput
                  id="input-field-departure-location"
                  label="Departure location"
                  icon={<MapPin size={18} />}
                  type="text"
                  {...register("departureLocation")}
                />
                <FormInput
                  id="input-field-departure-time"
                  label="Departure time"
                  icon={<Clock size={18} />}
                  type="time"
                  className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                  onClick={(e) => e.currentTarget.showPicker?.()}
                  {...register("departureTime")}
                />
                <div className="col-span-full">
                  <FormField
                    id="input-field-destination"
                    label="Notes or must-dos"
                    icon={<NotebookPen size={18} />}
                  >
                    <Textarea
                      className="items w-full pl-9"
                      placeholder="Slow mornings, one tea ceremony, vegetarian-friendly restaurants, and time for independent stationery shops."
                      {...register("note")}
                    />
                  </FormField>
                </div>
                <div />
              </div>
            </div>
          </div>
          <div className="mt-3 ml-auto flex w-fit flex-row gap-3 px-4">
            <Button
              variant="outline"
              className="h-11.5 bg-transparent"
              type="submit"
              name="action"
              value="draft"
            >
              <span>Save as draft</span>
            </Button>
            <Button
              variant="default"
              className="bg-accent-foreground h-11.5 px-4"
              type="submit"
              name="action"
              value="ai"
            >
              <div className="flex flex-row items-center gap-2">
                <Brain size={22} />
                <span className="text-sm font-normal text-white">
                  Generate trip plan with AI
                </span>
              </div>
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
