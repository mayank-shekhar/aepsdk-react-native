/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

class ExperienceEvent {
  xdmData?: Record<string, any>;
  data?: Record<string, any>;
  datasetIdentifier?: string;
  datastreamIdOverride?: string;
  datastreamConfigOverride?: Record<string, any>;

  constructor(
    xdmData?: Record<string, any>,
    data?: Record<string, any> | null,
    datasetIdentifier?: string | null,
    datastreamIdOverride?: string | null,
    datastreamConfigOverride?: Record<string, any> | null,
  ) {
    this.xdmData = xdmData;
    this.data = data;
    this.datasetIdentifier = datasetIdentifier;
    this.datastreamIdOverride = datastreamIdOverride;
    this.datastreamConfigOverride = datastreamConfigOverride;
  }
}

export default ExperienceEvent;
