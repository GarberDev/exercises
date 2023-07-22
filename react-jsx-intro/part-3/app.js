function App() {
  return (
    <div>
      <Person
        name="Johnathan Doe"
        age={25}
        hobbies={["Reading", "Coding", "Swimming"]}
      />
      <Person name="Jane Doe" age={15} hobbies={["Dancing", "Singing"]} />
      <Person name="Bob" age={17} hobbies={["Running", "Cooking"]} />
    </div>
  );
}
