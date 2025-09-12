import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { CreateAddressDto } from './dto/create-address-dto';
import { UpdateAddressDto } from './dto/update-address-dto';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {
    constructor(@InjectRepository(Address) private addressRepository: AddressRepository) { }

    async create(createAddressDto: CreateAddressDto) {
        const address = this.addressRepository.create(createAddressDto);
        await this.addressRepository.save(address);
    }

    async update(id: number, updateAddressDto: UpdateAddressDto) {
        const address = await this.addressRepository.findOne({ where: { id } });

        if (!address) {
            throw new NotFoundException(`Address with ID ${id} not found`);
        }

        this.addressRepository.merge(address, updateAddressDto);

        await this.addressRepository.save(address);
    }

    async remove(id: number): Promise<void> {
        const result = await this.addressRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Address with ID ${id} not found`);
        }
    }

    async getById(id: number): Promise<Address> {
        const address = await this.addressRepository.findOneBy({ id });

        if (!address) {
            throw new NotFoundException();
        }

        return address;
    }


}
