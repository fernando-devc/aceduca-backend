import { Injectable } from '@nestjs/common';
import { FileDTO } from './upload.dto';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
  async upload(file: FileDTO) {
    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseKEY = process.env.SUPABASE_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    // console.log(file)

    const {data, error} = await supabase.storage
      .from('aceduca')
      .upload('public/teste.png', file.buffer, {
        upsert: false,
      });

      if (error) {
        return error;
      }else{
        return data
      }

  }
}