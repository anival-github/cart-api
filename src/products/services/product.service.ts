import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../models/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  findAll(): Promise<ProductEntity[]> {
    return this.productsRepository.find();
  }

  find(options): Promise<ProductEntity[]> {
    return this.productsRepository.find(options);
  }

  findById(id: string): Promise<ProductEntity> {
    return this.productsRepository.findOneBy({ id });
  }

  async create(data: ProductEntity) {
    const productItem = this.productsRepository.create(data);
    await this.productsRepository.save(productItem);
    return productItem;
  }

  async upsertProduct(data: ProductEntity) {
    let productItem = null;
    productItem = await this.productsRepository.findOneBy({ id: data.id });

    if (!productItem) {
      productItem = await this.productsRepository.create(data);
    }

    const updatedItem = {
      ...productItem,
      ...data,
    };

    await this.productsRepository.save(updatedItem);

    return updatedItem;
  }
}
