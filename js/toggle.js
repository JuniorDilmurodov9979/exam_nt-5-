function toggleDarkMode() {
  let btn = document.querySelector(".dark_mode");
  let body = document.querySelector("body");

  if (btn.textContent === "Dark mode") {
    // Switch to Light Mode
    btn.textContent = "Light mode";
    btn.classList.remove(
      "bg-[#1E1E2E]",
      "text-[#A6E3E9]",
      "hover:bg-[#2A2A3A]",
      "hover:text-[#89DCEB]",
      "active:bg-[#161621]"
    );
    btn.classList.add(
      "bg-[#F8F9FA]",
      "text-[#222]",
      "hover:bg-[#E2E8F0]",
      "hover:text-[#111]",
      "active:bg-[#D1D5DB]"
    );
    body.classList.add("dark");

    // Save theme preference to localStorage
    localStorage.setItem("theme", "dark");
  } else {
    // Switch to Dark Mode
    btn.textContent = "Dark mode";
    btn.classList.remove(
      "bg-[#F8F9FA]",
      "text-[#222]",
      "hover:bg-[#E2E8F0]",
      "hover:text-[#111]",
      "active:bg-[#D1D5DB]"
    );
    btn.classList.add(
      "bg-[#1E1E2E]",
      "text-[#A6E3E9]",
      "hover:bg-[#2A2A3A]",
      "hover:text-[#89DCEB]",
      "active:bg-[#161621]"
    );
    body.classList.remove("dark");

    // Save theme preference to localStorage
    localStorage.setItem("theme", "light");
  }
}

// Apply saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const btn = document.querySelector(".dark_mode");
  const body = document.querySelector("body");

  if (savedTheme === "light") {
    // Apply Dark Mode
    btn.textContent = "Dark mode";
    btn.classList.remove(
      "bg-[#F8F9FA]",
      "text-[#222]",
      "hover:bg-[#E2E8F0]",
      "hover:text-[#111]",
      "active:bg-[#D1D5DB]"
    );
    btn.classList.add(
      "bg-[#1E1E2E]",
      "text-[#A6E3E9]",
      "hover:bg-[#2A2A3A]",
      "hover:text-[#89DCEB]",
      "active:bg-[#161621]"
    );
    body.classList.remove("dark");
  } else {
    // Apply Light Mode
    btn.textContent = "Light mode";
    btn.classList.remove(
      "bg-[#1E1E2E]",
      "text-[#A6E3E9]",
      "hover:bg-[#2A2A3A]",
      "hover:text-[#89DCEB]",
      "active:bg-[#161621]"
    );
    btn.classList.add(
      "bg-[#F8F9FA]",
      "text-[#222]",
      "hover:bg-[#E2E8F0]",
      "hover:text-[#111]",
      "active:bg-[#D1D5DB]"
    );
    body.classList.add("dark");
  }
});
