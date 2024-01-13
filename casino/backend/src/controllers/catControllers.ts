import {Controller, Get, Post, Body, Put, Param, Delete} from '@nestjs/common';


@Controller('cat')
class catColtroller{
    @Get()
    getCat():string{
        return "get cat";
    }
    @Post()
    postCat():string{
        return "post cat";
    }
    @Put()
    putCat():string{
        return "put cat";
    }
    @Delete()
    deleteCat():string{
        return "delete cat";
    }
}