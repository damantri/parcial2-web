import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  crearEvento(@Body() dto: CreateEventoDto) {
    return this.eventoService.crearEvento(dto);
  }

  @Patch(':id/aprobar')
  aprobarEvento(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.aprobarEvento(id);
  }

  @Delete(':id')
  eliminarEvento(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.eliminarEvento(id);
  }

  @Get(':id')
  findEventoById(@Param('id', ParseIntPipe) id: number) {
    return this.eventoService.findEventoById(id);
  }

  @Get()
  findAll() {
    return this.eventoService.findAll();
  }
}
