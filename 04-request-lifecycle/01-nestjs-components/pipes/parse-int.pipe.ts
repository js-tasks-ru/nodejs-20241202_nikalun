import { PipeTransform, BadRequestException } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const id = Number(value);
    if (!id) {
      throw new BadRequestException(`"${value}" не является числом`, {
        cause: new Error(),
        description: 'Bad Request',
      });
    }

    return id;
  }
}
