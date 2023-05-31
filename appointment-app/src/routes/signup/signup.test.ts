import { fireEvent, render, screen,expect} from "@testing-library/svelte";
// import { expect } from 'vitest';
import userEvent from "@testing-library/user-event";
import SignupForm from "./+page.svelte";


//renders the signup page
describe("SignupForm", () => {
  beforeEach(() => {
    render(SignupForm);
  });
//checks to see if error messages are show correctly for first name
  it("should show error message when first name input is empty", async () => {
    const input = screen.getByPlaceholderText("John");
    await userEvent.clear(input);
    await userEvent.tab();
    expect(screen.getByText("Please fill in all the required fields")).toBeInTheDocument();
  });

//checks to see if error messages are show correctly for email
  it("should show error message when email input is invalid", async () => {
    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "invalidemail");
    await userEvent.tab();
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
  });

//checks to see if error messages are show correctly for password
  it("should show error message when password input is invalid", async () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "weak");
    await userEvent.tab();
    expect(screen.getByText("Password must be at least 8 characters long")).toBeInTheDocument();
  });
//checks to see if error messages that the password is the same is correct 
  it("should show error message when confirm password input does not match password", async () => {
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
    await userEvent.type(passwordInput, "validPassword@123");
    await userEvent.type(confirmPasswordInput, "invalidPassword@123");
    await userEvent.tab();
    expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
  });

//checks to see if the enable button works to show users need to type everything correctly
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
  //checks to see if the button is disabled with a user types everything correctly
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
  //checks to see if everything is submitted correctly when everything is valid
  it("should submit form when all inputs are valid", async () => {
    const firstNameInput = screen.getByPlaceholderText("John");
    const lastNameInput = screen.getByPlaceholderText("Snow");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
  }); 
});
