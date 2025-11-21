import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PonenteService } from './ponente.service';
import { CreatePonenteDto } from './dto/create-ponente.dto';
@Controller('ponentes')
export class PonenteController {
  constructor(private readonly ponenteService: PonenteService) {}
  @Post()
  crearPonente(@Body() createPonenteDto: CreatePonenteDto) {
    return this.ponenteService.crearPonente(createPonenteDto);
  }


  @Get(':id')
  findPonenteById(@Param('id', ParseIntPipe) id: number) {
    return this.ponenteService.findPonenteById(id);
  }

  @Delete (':id')
  eliminarPonente(@Param('id', ParseIntPipe) id: number) {
    return this.ponenteService.eliminarPonente(id);
  }
}
