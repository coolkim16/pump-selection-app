import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PumpModel {
  model: string;
  maxFlowRate: number; // L/min
  maxPressure: number; // bar
  motorPower: number; // KW
}

const pumpModels: PumpModel[] = [
  { model: 'PDS-006', maxFlowRate: 0.065, maxPressure: 10, motorPower: 0.25 },
  { model: 'PDS-01', maxFlowRate: 0.1, maxPressure: 10, motorPower: 0.25 },
  { model: 'PDS-02', maxFlowRate: 0.2, maxPressure: 10, motorPower: 0.25 },
  { model: 'PDS-05', maxFlowRate: 0.5, maxPressure: 10, motorPower: 0.25 },
  { model: 'PDS-1', maxFlowRate: 1.2, maxPressure: 5, motorPower: 0.25 },
  { model: 'PDS-3', maxFlowRate: 2.5, maxPressure: 5, motorPower: 0.25 },
  { model: 'PDS-5', maxFlowRate: 5.5, maxPressure: 5, motorPower: 0.25 },
  { model: 'PDS-10', maxFlowRate: 10.5, maxPressure: 5, motorPower: 0.55 },
  { model: 'PDS-20', maxFlowRate: 23, maxPressure: 5, motorPower: 0.75 },
  { model: 'PDS-40', maxFlowRate: 37, maxPressure: 5, motorPower: 1.5 },
  { model: 'PDS-50', maxFlowRate: 52, maxPressure: 5, motorPower: 1.5 },
];

const Index = () => {
  const [requiredFlowRate, setRequiredFlowRate] = useState<string>('');
  const [requiredPressure, setRequiredPressure] = useState<string>('');
  const [recommendedModels, setRecommendedModels] = useState<PumpModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<PumpModel | null>(null);

  const findSuitableModels = () => {
    const flowRate = parseFloat(requiredFlowRate);
    const pressure = parseFloat(requiredPressure);

    if (isNaN(flowRate) || isNaN(pressure)) {
      alert('유효한 숫자를 입력해주세요.');
      return;
    }

    // 요구사항을 만족하는 모델들을 찾기
    const suitable = pumpModels.filter(
      model => model.maxFlowRate >= flowRate && model.maxPressure >= pressure
    );

    // 유량 기준으로 정렬 (가장 적합한 모델부터)
    suitable.sort((a, b) => a.maxFlowRate - b.maxFlowRate);
    
    setRecommendedModels(suitable);
    setSelectedModel(suitable[0] || null);
  };

  const resetSelection = () => {
    setRequiredFlowRate('');
    setRequiredPressure('');
    setRecommendedModels([]);
    setSelectedModel(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PDS 다이어프램 정량펌프 모델 선정
          </h1>
          <p className="text-lg text-gray-600">
            최대토출량과 최고토출압력을 입력하여 최적의 펌프 모델을 찾아보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 입력 섹션 */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                요구사항 입력
              </CardTitle>
              <CardDescription>
                필요한 펌프 성능을 입력해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="flowRate">최대토출량 (L/min)</Label>
                <Input
                  id="flowRate"
                  type="number"
                  step="0.001"
                  placeholder="예: 0.5"
                  value={requiredFlowRate}
                  onChange={(e) => setRequiredFlowRate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pressure">최고토출압력 (bar)</Label>
                <Input
                  id="pressure"
                  type="number"
                  step="0.1"
                  placeholder="예: 7"
                  value={requiredPressure}
                  onChange={(e) => setRequiredPressure(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={findSuitableModels} className="flex-1">
                  모델 검색
                </Button>
                <Button variant="outline" onClick={resetSelection}>
                  초기화
                </Button>
              </div>

              {/* 카탈로그 이미지 */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">제품 카탈로그</h3>
                <div className="grid grid-cols-1 gap-3">
                  <img 
                    src="./images/pump_catalog_1.jpeg" 
                    alt="PDS 펌프 카탈로그" 
                    className="w-full rounded-lg border shadow-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
            {/* YouTube 영상 추가 */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">제품 소개 영상</h3>
                  <div className="relative w-full rounded-lg overflow-hidden shadow-sm" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/ZFKNHbv7xTk"
                      title="PDS 다이어프램 정량펌프 소개"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
          {/* 결과 섹션 */}
          <div className="space-y-6">
            {recommendedModels.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    추천 모델
                  </CardTitle>
                  <CardDescription>
                    요구사항을 만족하는 {recommendedModels.length}개의 모델을 찾았습니다
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {recommendedModels.slice(0, 5).map((model, index) => (
                      <div
                        key={model.model}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedModel?.model === model.model
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedModel(model)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-lg">{model.model}</h4>
                            <p className="text-sm text-gray-600">
                              최대 {model.maxFlowRate} L/min, {model.maxPressure} bar
                            </p>
                          </div>
                          {index === 0 && (
                            <Badge variant="default">최적</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedModel && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedModel.model} 상세 사양</CardTitle>
                  <CardDescription>
                    선택된 모델의 자세한 사양 정보입니다
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">최대토출량</Label>
                        <p className="text-lg font-semibold">{selectedModel.maxFlowRate} L/min</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">최고토출압력</Label>
                        <p className="text-lg font-semibold">{selectedModel.maxPressure} bar ({(selectedModel.maxPressure * 14.5).toFixed(1)} PSI)</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">모터 동력</Label>
                        <p className="text-lg font-semibold">{selectedModel.motorPower} KW</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">주요 특징</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• 다이어프램 파손감지장치 내장형으로 높은 안정성</li>
                        <li>• 최대 20,000mPa·s까지 고점도 약액 이송 가능</li>
                        <li>• BLDC M/C Unit 기본사양으로 탑재</li>
                        <li>• ±3% 이내의 낮은 맥동률 (청수, 100% 속도 기준)</li>
                      </ul>
                    </div>

                    <div className="mt-6">
                      <img 
                        src="./images/pump_catalog_2.png" 
                        alt={`${selectedModel.model} 펌프`} 
                        className="w-full max-w-md mx-auto rounded-lg border shadow-sm"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {recommendedModels.length === 0 && requiredFlowRate && requiredPressure && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  입력하신 요구사항을 만족하는 모델이 없습니다. 요구사항을 다시 확인해주세요.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
