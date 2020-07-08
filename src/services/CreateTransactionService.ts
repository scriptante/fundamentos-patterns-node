import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome') {
      if (balance.total - value < 0) {
        throw Error('insufficient funds');
      }
      const transaction = new Transaction({
        title,
        value,
        type: 'outcome',
      });
      return transaction;
    }
    if (type === 'income') {
      const transaction = new Transaction({
        title,
        value,
        type: 'income',
      });
      return transaction;
    }
    throw Error('Invalid type');
  }
}

export default CreateTransactionService;
