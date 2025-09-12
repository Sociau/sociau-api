import { Injectable, NotFoundException } from '@nestjs/common';
import { uploadImageToFirebase } from 'src/lib/firebase/uploadImage';
import { PetsImagesRepository } from './pets_images.repository';

@Injectable()
export class PetsImagesService {

  constructor(private readonly petsImagesRepository: PetsImagesRepository) { }

  async create(petId: number, files: Express.Multer.File[]) {
    const urls: string[] = [];

    for (const file of files) {
      const url = await uploadImageToFirebase(file, 'pets');
      urls.push(url);
    }

    const images = this.petsImagesRepository.create({
      pet: { id: petId },
      images: urls
    });
    await this.petsImagesRepository.save(images);

    return images;
  }

  async update(petId: number, files: Express.Multer.File[]) {
    const current = await this.petsImagesRepository.findOneBy({ pet: { id: petId } });

    if (!current) {
      throw new NotFoundException(`Pet images of pet with ID ${petId} not found`);
    }

    const urls: string[] = [];

    for (const file of files) {
      const url = await uploadImageToFirebase(file, 'pets');
      urls.push(url);
    }

    const images = {
      pet: { id: petId },
      images: urls
    }

    this.petsImagesRepository.merge(current, images);

    await this.petsImagesRepository.save(current);
  }
}
