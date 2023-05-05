import { fireEvent, render, screen,expect} from "@testing-library/svelte";
// import { expect } from 'vitest';
import userEvent from "@testing-library/user-event";
import SignupForm from "./+page.svelte";

describe("SignupForm", () => {
  beforeEach(() => {
    render(SignupForm);
  });

  it("should show error message when first name input is empty", async () => {
    const input = screen.getByPlaceholderText("John");
    await userEvent.clear(input);
    await userEvent.tab();
    expect(screen.getByText("Please fill in all the required fields")).toBeInTheDocument();
  });

  it("should show error message when email input is invalid", async () => {
    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "invalidemail");
    await userEvent.tab();
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  it("should show error message when password input is invalid", async () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "weak");
    await userEvent.tab();
    expect(screen.getByText("Password must be at least 8 characters long")).toBeInTheDocument();
  });

  it("should show error message when confirm password input does not match password", async () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
    await userEvent.type(passwordInput, "validPassword@123");
    await userEvent.type(confirmPasswordInput, "invalidPassword@123");
    await userEvent.tab();
    expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
  });

  it("should enable submit button when all inputs are valid", async () => {
    const firstNameInput = screen.getByPlaceholderText("John");
    const lastNameInput = screen.getByPlaceholderText("Snow");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
    await userEvent.type(firstNameInput, "John");
    await userEvent.type(lastNameInput, "Snow");
    await userEvent.type(emailInput, "john.snow@example.com");
    await userEvent.type(passwordInput, "validPassword@123");
    await userEvent.type(confirmPasswordInput, "validPassword@123");
    expect(screen.getByRole("button", { name: "Sign up" })).not.toBeDisabled();
  });

  it("should disable submit button when any input is invalid", async () => {
    const firstNameInput = screen.getByPlaceholderText("John");
    const lastNameInput = screen.getByPlaceholderText("Snow");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
    await userEvent.type(firstNameInput, "John");
    await userEvent.type(lastNameInput, "Snow");
    await userEvent.type(emailInput, "invalidemail");
    await userEvent.type(passwordInput, "weak");
    await userEvent.type(confirmPasswordInput, "weak");
    expect(screen.getByRole("button", { name: "Sign up" })).toBeDisabled();
  });

  it("should submit form when all inputs are valid", async () => {
    const firstNameInput = screen.getByPlaceholderText("John");
    const lastNameInput = screen.getByPlaceholderText("Snow");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  }); 
});
