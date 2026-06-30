export function initBooking() {
  return {
    step: "calendar",
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    selectedDate: null,
    selectedTime: null,
    showGuests: false,
    formData: {
      name: "",
      email: "",
      guests: "",
      notes: "",
    },

    monthLabel() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
    },

    blanks() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      return firstDay === 0 ? 6 : firstDay - 1;
    },

    days() {
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(this.currentYear, this.currentMonth, i + 1);
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isPast = date < today;

        return {
          num: i + 1,
          date: date,
          available: !isWeekend && !isPast,
        };
      });
    },

    selectedDayName() {
      if (!this.selectedDate) return "";
      return this.selectedDate.toLocaleString("en-US", { weekday: "long" });
    },

    selectedDateLabel() {
      if (!this.selectedDate) return "";
      return this.selectedDate.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    },

    selectedTimeLabel() {
      if (!this.selectedTime || !this.selectedDate) return "";
      const start = this.selectedTime;
      const [h, m] = start.split(":").map(Number);
      const endMinutes = h * 60 + m + 30;
      const endH = Math.floor(endMinutes / 60);
      const endM = endMinutes % 60;
      const end = `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
      return `${start} - ${end}, ${this.selectedDayName()}, ${this.selectedDateLabel()}`;
    },

    currentTimezone() {
      const now = new Date();
      const offset = -now.getTimezoneOffset() / 60;
      const sign = offset >= 0 ? "+" : "";
      return `${sign}${offset}`;
    },

    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },

    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },

    selectDate(day) {
      if (!day.available) return;
      this.selectedDate = day.date;
      this.selectedTime = null;
      this.step = "time";
    },

    isSelectedDate(day) {
      if (!this.selectedDate) return false;
      return (
        day.date.getDate() === this.selectedDate.getDate() &&
        day.date.getMonth() === this.selectedDate.getMonth() &&
        day.date.getFullYear() === this.selectedDate.getFullYear()
      );
    },

    selectTime(time) {
      this.selectedTime = time;
      if (this.selectedTime === time) {
        setTimeout(() => {
          this.step = "form";
        }, 300);
      }
    },

    submitBooking() {
      if (!this.formData.name || !this.formData.email) return;
      this.step = "confirmation";
    },
  };
}
