import React, { useState, useRef } from 'react';
import ActivitySection from './components/ActivitySection';
import QuestionBox from './components/QuestionBox';
import { 
    RocketIcon, CompassIcon, BabyIcon, SearchIcon, LightbulbIcon, UsersIcon, ChartPieIcon, 
    ScaleIcon, PuzzlePieceIcon, StarIcon, CompressIcon, HeartIcon, TrophyIcon,
    ChevronLeftIcon, ChevronRightIcon, DownloadIcon
} from './components/Icons';

declare var htmlToImage: any;

const AnswerInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-base transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white" />
);

const AnswerTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-base transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white" />
);

const App: React.FC = () => {
    const [name, setName] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const totalPages = 5;
    const reportRef = useRef<HTMLElement>(null);

    const navigate = (newPage: number) => {
        setIsFading(true);
        setTimeout(() => {
            setCurrentPage(newPage);
            setIsFading(false);
            window.scrollTo(0, 0);
        }, 200);
    };

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            navigate(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            navigate(currentPage - 1);
        }
    };
    
    const handleSaveAsImage = () => {
        if (reportRef.current === null || typeof htmlToImage === 'undefined') {
            alert('이미지 저장 기능을 사용할 수 없습니다.');
            return;
        }

        htmlToImage.toPng(reportRef.current, { cacheBust: true, backgroundColor: '#fdf8e6' })
            .then((dataUrl: string) => {
                const link = document.createElement('a');
                const fileName = name ? `${name}-인구탐험-보고서.png` : '인구탐험-보고서.png';
                link.download = fileName;
                link.href = dataUrl;
                link.click();
            })
            .catch((err: any) => {
                console.error('oops, something went wrong!', err);
                alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
            });
    };

    const getNextButtonText = () => {
        switch (currentPage) {
            case 0: return '탐험 시작!';
            case 3: return '보고서 작성하기';
            default: return '다음 단계로';
        }
    };

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 0: return (
                <section className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
                    <div className="flex items-center mb-4">
                        <CompassIcon className="w-8 h-8 text-green-600 mr-4" />
                        <h2 className="text-2xl font-bold text-gray-800">탐험 시작!</h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        안녕하세요, 용감한 시간탐험대원! 우리는 오늘 3개의 특별한 데이터 앱을 통해 과거와 미래를 오가며 
                        우리나라 인구에 숨겨진 거대한 변화의 비밀을 파헤쳐 볼 거예요. 각 앱에서 단서를 찾고, 
                        마지막에 미래 사회 보고서를 완성해 봅시다!
                    </p>
                </section>
            );
            case 1: return (
                <ActivitySection
                    step="1단계"
                    title="점점 귀해지는 아기 울음소리"
                    description="첫 번째 시간여행! 우리나라에서는 얼마나 많은 아기가 태어났을까요?"
                    icon={<BabyIcon className="w-8 h-8" />}
                    iframeSrc="https://birthrate2.netlify.app/"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <QuestionBox title="관찰하기" icon={<SearchIcon className="w-6 h-6" />}>
                            <p>1970년대에는 여성 한 명이 평생 낳을 것으로 예상되는 아기 수가 평균 4명이 넘었어요. 그렇다면, 그래프의 가장 마지막에 있는 최근의 숫자는 얼마인가요?</p>
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold">정답: 약</span>
                                <AnswerInput type="text" placeholder="숫자를 입력하세요" className="flex-1" />
                                <span className="font-semibold">명</span>
                            </div>
                        </QuestionBox>
                        <QuestionBox title="생각하기" icon={<LightbulbIcon className="w-6 h-6" />} titleColorClass="text-purple-800">
                            <p>그래프의 선이 계속 아래로 향하는 것은 우리 사회에 어떤 의미일까요?</p>
                            <AnswerTextarea rows={3} placeholder="여러분의 생각을 자유롭게 써보세요"></AnswerTextarea>
                        </QuestionBox>
                    </div>
                </ActivitySection>
            );
            case 2: return (
                <ActivitySection
                    step="2단계"
                    title="지혜로운 어르신들이 많아지는 마을"
                    description="두 번째 시간여행! 이번엔 우리 사회의 할머니, 할아버지 인구 변화를 살펴봅시다."
                    icon={<UsersIcon className="w-8 h-8" />}
                    iframeSrc="https://oldpeople1.netlify.app/"
                    isGrayBg={true}
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <QuestionBox title="관찰하기" icon={<SearchIcon className="w-6 h-6" />}>
                            <p>그래프를 보니, 시간이 지날수록 노인 인구(65세 이상)의 비율은 어떻게 변하고 있나요?</p>
                            <AnswerInput type="text" placeholder="변화 양상을 설명해보세요" />
                        </QuestionBox>
                        <QuestionBox title="생각하기" icon={<LightbulbIcon className="w-6 h-6" />} titleColorClass="text-purple-800">
                            <p>미래에 노인 인구 비율이 매우 높아진 사회에서 우리는 무엇을 준비해야 할까요? 여러분의 따뜻한 아이디어를 들려주세요.</p>
                            <AnswerTextarea rows={3} placeholder="미래 사회 준비 아이디어를 써보세요"></AnswerTextarea>
                        </QuestionBox>
                    </div>
                </ActivitySection>
            );
            case 3: return (
                <ActivitySection
                    step="3단계"
                    title="모양이 변하는 대한민국"
                    description="마지막 시간여행! 찾은 단서들을 합쳐 인구 구조 전체의 변화를 파악해 봅시다."
                    icon={<ChartPieIcon className="w-8 h-8" />}
                    iframeSrc="https://population1.netlify.app/"
                >
                    <div className="space-y-4">
                        <QuestionBox title="비교하기" icon={<ScaleIcon className="w-6 h-6" />}>
                            <p>슬라이더를 움직이며 1960년과 가장 미래 연도에 각각 놓고 비교해 보세요.</p>
                            <div className="grid md:grid-cols-2 gap-4 md:items-start">
                                <p className="font-semibold">1960년: 가장 큰 조각은 <strong>0-14세(어린이)</strong>와 <strong>15-64세(어른)</strong>였어요.</p>
                                <div>
                                    <p className="font-semibold mb-2">미래: 가장 큰 변화를 보이는 조각은?</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2"><span>색깔:</span><AnswerInput type="text" placeholder="색깔" className="w-24" /><span>색</span></div>
                                        <div className="flex items-center space-x-2"><span>크기 변화:</span><AnswerInput type="text" placeholder="예: 매우 커짐" /></div>
                                    </div>
                                </div>
                            </div>
                        </QuestionBox>
                        <QuestionBox title="종합하기" icon={<PuzzlePieceIcon className="w-6 h-6" />} titleColorClass="text-purple-800">
                            <p>왜 이런 변화가 나타났을까요? 앞에서 찾은 <strong>두 개의 단서(출산율, 노인 인구)</strong>를 이용해 그 이유를 설명해 보세요.</p>
                            <AnswerTextarea rows={4} placeholder="1단계와 2단계에서 발견한 내용을 연결하여 설명해보세요"></AnswerTextarea>
                        </QuestionBox>
                    </div>
                </ActivitySection>
            );
            case 4: return (
                <section ref={reportRef} className="p-6" style={{ backgroundColor: '#fdf8e6' }}>
                    <header className="text-white p-6 rounded-lg mb-6 shadow-md bg-gradient-to-r from-orange-500 to-red-500">
                        <h2 className="text-3xl font-bold flex items-center"><StarIcon className="w-8 h-8 mr-3" />시간탐험 보고서: 내가 그리는 미래 사회</h2>
                        <p className="opacity-90 mt-2">모든 비밀을 파헤친 탐험대원, 정말 대단해요! 이제 탐험을 통해 알게 된 내용을 바탕으로 여러분이 상상하는 미래 사회 보고서를 작성해 주세요.</p>
                    </header>

                    <div className="mb-6 px-4">
                        <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2">
                            탐험대원: <span className="font-normal">{name || '이름을 입력해주세요'}</span>
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <QuestionBox title="한 줄 요약" icon={<CompressIcon className="w-6 h-6" />} titleColorClass="text-orange-800">
                             <p>우리나라의 인구 변화에서 가장 중요한 특징은 무엇인가요?</p>
                             <AnswerInput type="text" placeholder="한 줄로 요약해보세요" />
                        </QuestionBox>
                        <QuestionBox title="미래 제안" icon={<RocketIcon className="w-6 h-6" />} titleColorClass="text-red-800">
                            <p>이러한 인구 변화에 잘 대비하기 위해 우리 사회에 꼭 필요한 발명품이나 정책 아이디어가 있다면 자유롭게 글로 써보세요.</p>
                            <AnswerTextarea 
                                rows={8} 
                                placeholder="예: 어르신들을 위한 스마트 돌봄 로봇, 아이들을 위한 더 많은 놀이터 만들기 등 여러분의 아이디어를 자유롭게 적어주세요." 
                            />
                        </QuestionBox>
                         <QuestionBox title="탐험 소감" icon={<HeartIcon className="w-6 h-6" />} titleColorClass="text-green-800">
                            <p>오늘 인구변화 탐험을 통해 새롭게 알게 된 점이나 느낀 점을 자유롭게 써보세요.</p>
                            <AnswerTextarea rows={4} placeholder="탐험을 마친 소감을 들려주세요"></AnswerTextarea>
                        </QuestionBox>
                    </div>
                </section>
            );
            default: return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden my-4 sm:my-8">
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center sticky top-0 z-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
                    <RocketIcon className="w-10 h-10 mr-3" />
                    데이터 탐험가: 우리나라 인구변화의 비밀을 찾아라!
                </h1>
                <p className="text-xl opacity-90">3개의 특별한 앱으로 떠나는 시간여행 탐험</p>
                <div className="mt-6 p-3 bg-white bg-opacity-20 rounded-lg inline-block">
                    <label className="text-lg font-semibold">
                        탐험대원 이름:{' '}
                        <input 
                            type="text" 
                            className="bg-transparent border-b-2 border-white text-white placeholder-gray-200 px-2 py-1 text-lg w-48" 
                            placeholder="여기에 이름을 써주세요"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                </div>
            </header>
            
            <main className={`transition-opacity duration-200 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                {renderCurrentPage()}
            </main>
            
            <div className="p-6 flex justify-between items-center bg-gray-100 border-t">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg font-semibold shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                    이전
                </button>
                <div className="text-gray-600 font-semibold text-sm sm:text-base">
                    {currentPage === 0 && '소개'}
                    {currentPage > 0 && currentPage < totalPages - 1 && `활동 ${currentPage} / ${totalPages - 2}`}
                    {currentPage === totalPages - 1 && '최종 보고서'}
                </div>
                 <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {getNextButtonText()}
                    <ChevronRightIcon className="w-5 h-5" />
                </button>
            </div>
            
            {currentPage === totalPages - 1 && (
                <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <TrophyIcon className="w-8 h-8 mr-3" />
                        <h2 className="text-2xl font-bold">탐험 완료!</h2>
                    </div>
                    <p className="text-lg opacity-90 mb-6">여러분의 빛나는 아이디어로 대한민국의 미래는 더욱 밝아질 거예요!</p>
                     <button
                        onClick={handleSaveAsImage}
                        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-bold shadow-lg hover:bg-green-600 transition-colors mx-auto"
                    >
                        <DownloadIcon className="w-6 h-6" />
                        보고서 이미지로 저장하기
                    </button>
                </footer>
            )}
        </div>
    );
};

export default App;