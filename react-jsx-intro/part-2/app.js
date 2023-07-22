function App() {
  return (
    <div>
      <Tweet
        name="Justin Garber"
        username="codingwithjustin"
        date={new Date().toDateString()}
        message="This is my tweet!"
      />
      <Tweet
        name="Jaimie Garber"
        username="garberjaimie"
        date={new Date().toDateString()}
        message="animals are the best"
      />
      <Tweet
        name="Colt Steele"
        username="steelcolt"
        date={new Date().toDateString()}
        message="I love chickens too much"
      />
    </div>
  );
}
