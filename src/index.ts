import {
  choice,
  TypeSafeClient,
  type TypeSafeClientConfig,
} from "@typesafe-ai/sdk";

export async function fizzbuzz(
  value: number,
  config?: TypeSafeClientConfig,
): Promise<"Fizz" | "Buzz" | "FizzBuzz" | number> {
  const client = new TypeSafeClient(config);

  const { answers } = await client.systemOne({
    state: { number: value },
    questions: {
      term: choice("Which FizzBuzz term does the number get?", {
        Fizz: "The number is a multiple of 3 but not of 5.",
        Buzz: "The number is a multiple of 5 but not of 3.",
        FizzBuzz: "The number is a multiple of both 3 and 5.",
        Number: "The number is a multiple of neither 3 nor 5.",
      }),
    },
  });

  return answers.term.choice === "Number" ? value : answers.term.choice;
}
