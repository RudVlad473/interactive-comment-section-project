// const generator = idGenerator(1)

// function getId() {
//   return generator.next().value as number
// }

class IdGenerator {
  private idGenerator: Generator<number, void, unknown>;

  *idGeneratorFunc(startingId: number) {
    for (let newId = startingId; ; newId++) {
      yield newId
    }
  }

  constructor(startingId: number) {
    this.idGenerator = this.idGeneratorFunc(startingId)
  }

  getId() {
    return this.idGenerator.next().value as number
  }
}

const SequentialIdGenerator = new IdGenerator(1)

export function assignSequentialIds<T extends { id: number }>(iterable: Iterable<T>) {
  for (const value of iterable) {
    value.id = SequentialIdGenerator.getId()
  }
}

export default SequentialIdGenerator
