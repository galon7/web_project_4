export function renderLoading(isLoading, button) {
  button.textContent = isLoading ? "Saving..." : "Save";
}
