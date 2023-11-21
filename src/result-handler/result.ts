class Result<T, K = never> {
  public isOk(): this is Ok<T> {
    return this instanceof Ok
  }

  public isFail(): this is Fail<K> {
    return this instanceof Fail
  }

  public static ok<J>(value: J): Result<J, never> {
    return new Ok(value)
  }

  public static fail<J>(message: J): Result<never, J> {
    return new Fail(message)
  }
}

class Ok<T> extends Result<T, never> {
  constructor(
    public value: T
  ) {
    super()
  }
}

class Fail<T> extends Result<never, T> {
  constructor(
    public message: T
  ) {
    super()
  }
}

// Apenas a classe Result é utilizada, ela serve tanto como tipo quanto uma factory (que cria a classe Ok<T> e a classe Fail<T>). O resultado de um Result é variável e conseguimos acessar
// os métodos específicos de cada classe (Ok<T> e Fail<T>) graças ao "this is Type guards" em isOk() e isFail().

class Todo {
  private constructor(
    public readonly title: string,
    public readonly description: string,
    public completed: boolean
  ) {}

  public static create(title: string, description: string): Result<Todo, "TITLE_TOO_SHORT" | "DESCRIPTION_TOO_SHORT"> {
    if (title.length < 3) return Result.fail("TITLE_TOO_SHORT")
    if (description.length < 5) return Result.fail("DESCRIPTION_TOO_SHORT")
    
    return Result.ok(new Todo(title, description, false))
  }
}

const todo = Todo.create("hello", "wo")

if (todo.isOk()) console.log(todo.value.title)
if (todo.isFail()) console.log(todo.message === "TITLE_TOO_SHORT")
