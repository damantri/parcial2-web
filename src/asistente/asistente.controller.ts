import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AsistenteService } from './asistente.service';
import { CreateAsistenteDto } from './dto/create-asistente.dto';
@Controller('eventos/:eventoId/asistentes')
export class AsistenteController {
  constructor(private readonly asistenteService: AsistenteService) {}
  @Post()
  registrarAsistente(
    @Param('eventoId', ParseIntPipe) eventoId: number,
    @Body() createAsistenteDto: CreateAsistenteDto,
  ) {
    return this.asistenteService.registrarAsistente(
      eventoId,
      createAsistenteDto,
    );
  }
  @Get()
  findAsistentesByEvento(
    @Param('eventoId', ParseIntPipe) eventoId: number,
  ) {
    return this.asistenteService.findAsistentesByEvento(eventoId);
  }
}
