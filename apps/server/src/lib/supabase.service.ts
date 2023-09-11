import {
  Injectable,
  InternalServerErrorException,
  Logger,
  Scope,
} from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { config } from '~/config';

@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private readonly logger = new Logger(Supabase.name);
  private clientInstance: SupabaseClient;

  public getClient() {
    this.logger.log('getting supabase client...');
    if (this.clientInstance) {
      this.logger.log('client exists - returning for current Scope.REQUEST');
      return this.clientInstance;
    }

    this.logger.log('initialising new supabase client for new Scope.REQUEST');
    config;
    this.clientInstance = createClient(config.supabaseUrl, config.supabaseKey);

    return this.clientInstance;
  }

  public async uploadToStorage(
    bucketName: string,
    filePath: string,
    file: any,
  ) {
    const { data, error } = await this.clientInstance.storage
      .from(bucketName)
      .upload(filePath, file);

    if (error) throw new InternalServerErrorException('upload failed');

    return data.path;
  }
}
